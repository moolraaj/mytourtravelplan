import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { getPaginationParams } from "@/helpers/paginations";
import continentModel from "@/model/continentModel";
import countriesModel from "@/model/countryModel";
import CitiesModel from "@/model/citiesModel";
import PackagesModel from "@/model/packagesModel";
import BlogModel from "@/model/blogModel";
import ActivitiesModel from "@/model/activitiesModel";
import PackageCategoryModel from "@/model/packageCategories";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req) {
  return handelAsyncErrors(async () => {
    const { page, limit, skip } = getPaginationParams(req);

    // Fetch paginated data for all sections

    // Continents
    const continents = await continentModel
      .find()
      .populate({
        path: "all_countries",
        populate: {
          path: "all_cities",
          populate: {
            path: "all_packages",
          },
        },
      })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    const totalContinents = await continentModel.countDocuments();

    // Countries
    const countries = await countriesModel
      .find()
      .populate({
        path: "all_cities",
        populate: {
          path: "all_packages",
        },
      })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    const totalCountries = await countriesModel.countDocuments();

    // Cities
    const cities = await CitiesModel.find().exec();
    const citiesWithLowestPrices = await Promise.all(
      cities.map(async (city) => {
        const packages = await PackagesModel.find({ city_id: city._id })
          .sort({ package_price: 1 })
          .limit(1)
          .lean()
          .exec();
        return {
          city,
          lowestPricedPackage: packages.length ? packages[0] : null,
          lowestPrice: packages.length ? packages[0].package_price : Infinity,
        };
      })
    );
    citiesWithLowestPrices.sort((a, b) => a.lowestPrice - b.lowestPrice);
    const paginatedCities = citiesWithLowestPrices.slice(skip, skip + limit);
    const totalCities = citiesWithLowestPrices.length;

    // Packages
    const packages = await PackagesModel.find()
      .limit(limit)
      .skip(skip)
      .populate({
        path: "city_id",
        populate: {
          path: "country_id",
          populate: {
            path: "continent_id",
          },
        },
      })
      .lean()
      .exec();
    const totalPackages = await PackagesModel.countDocuments();

    // Blogs
    const blogs = await BlogModel.find()
      .populate("blog_category")
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    const totalBlogs = await BlogModel.countDocuments();

    // Activities
    const activities = await ActivitiesModel.find()
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    const totalActivities = await ActivitiesModel.countDocuments();

    // Package Categories
    const packageCategories = await PackageCategoryModel.find()
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    const totalPackageCategories = await PackageCategoryModel.countDocuments();

    // Format results
    const result = {
      continents: continents.map((continent) => ({
        _id: continent._id,
        images: continent.images,
        title: continent.title,
        description: continent.description,
        slug: continent.slug,
        countries: continent.all_countries.map((country) => ({
          _id: country._id,
          images: country.images,
          title: country.title,
          description: country.description,
          slug: country.slug,
          cities: country.all_cities.map((city) => ({
            _id: city._id,
            city_name: city.title,
            city_packages_count: city.all_packages.length,
          })),
          totalCities: country.all_cities.length,
        })),
        total_countries: continent.all_countries.length,
      })),
      countries: countries.map((country) => ({
        _id: country._id,
        images: country.images,
        title: country.title,
        description: country.description,
        slug: country.slug,
        cities: country.all_cities.map((city) => ({
          _id: city._id,
          city_name: city.title,
          city_packages_count: city.all_packages.length,
        })),
        totalCities: country.all_cities.length,
      })),
      cities: paginatedCities.map(({ city, lowestPricedPackage }) => ({
        _id: city._id,
        images: city.images,
        title: city.title,
        description: city.description,
        slug: city.slug,
        package: lowestPricedPackage
          ? {
              _id: lowestPricedPackage._id,
              title: lowestPricedPackage.title,
              price: lowestPricedPackage.package_price,
              discounted_price:
                lowestPricedPackage.package_discounted_price,
            }
          : null,
        packagesCount: lowestPricedPackage ? 1 : 0,
      })),
      packages: packages.map((pkg) => ({
        _id: pkg._id,
        images: pkg.images,
        title: pkg.title,
        description: pkg.description,
        slug: pkg.slug,
        package_price: pkg.package_price,
        package_discounted_price: pkg.package_discounted_price,
        package_days: pkg.package_days,
        package_nights: pkg.package_nights,
        package_under_continent: pkg.city_id?.country_id?.continent_id
          ? {
              _id: pkg.city_id.country_id.continent_id._id.toString(),
              title: pkg.city_id.country_id.continent_id.title,
              slug: pkg.city_id.country_id.continent_id.slug,
            }
          : null,
        package_under_country: pkg.city_id?.country_id
          ? {
              _id: pkg.city_id.country_id._id.toString(),
              title: pkg.city_id.country_id.title,
              slug: pkg.city_id.country_id.slug,
            }
          : null,
        package_under_city: pkg.city_id
          ? {
              _id: pkg.city_id._id.toString(),
              title: pkg.city_id.title,
              slug: pkg.city_id.slug,
            }
          : null,
      })),
      blogs: blogs.map((blog) => ({
        _id: blog._id,
        images: blog.images,
        title: blog.title,
        description: blog.description,
        slug: blog.slug,
        category: blog.blog_category
          ? {
              _id: blog.blog_category._id,
              name: blog.blog_category.name,
              slug: blog.blog_category.slug,
            }
          : null,
        blog_overview: blog.blog_overview,
        blog_description: blog.blog_description,
        createdAt: blog.createdAt,
      })),
      activities: activities.map((activity) => {
        const discount =
          activity.activity_price && activity.activity_discounted_price
            ? (
                ((activity.activity_price -
                  activity.activity_discounted_price) /
                  activity.activity_price) *
                100
              ).toFixed(2)
            : "0";
        return {
          _id: activity._id,
          icon: activity.icon,
          images: activity.images,
          title: activity.title,
          description: activity.description,
          slug: activity.slug,
          activity_price: activity.activity_price,
          activity_discounted_price: activity.activity_discounted_price,
          discount,
          city_id: activity.city_id,
        };
      }),
      packageCategories: packageCategories.map((category) => ({
        _id: category._id,
        image: category.image,
        title: category.title,
        description: category.description,
        slug: category.slug,
      })),
      pagination: {
        page,
        limit,
        totalContinents,
        totalCountries,
        totalCities,
        totalPackages,
        totalBlogs,
        totalActivities,
        totalPackageCategories,
      },
    };

    return NextResponse.json({
      status: 200,
      success: true,
      result,
    });
  });
}
