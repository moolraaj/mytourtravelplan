// /api/v1/(searchapi)/search/route.js

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import continentModel from '@/model/continentModel';
import countriesModel from '@/model/countryModel';
import CitiesModel from '@/model/citiesModel';
import PackagesModel from '@/model/packagesModel';
import ActivitiesModel from '@/model/activitiesModel';
import BlogModel from '@/model/blogModel';
import { DbConnect } from '@/database/database';

// Connect to MongoDB
await DbConnect();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  const results = {
    continents: [],
    cities: [],
    countries: [],
    packages: [],
    activities: [],
    blogs: []
  };

  try {
    // Check if query is valid
    if (typeof query !== 'string' || query.trim() === '') {
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'Invalid query parameter'
      });
    }

    // Search in continents
    results.continents = await continentModel.find({
      title: { $regex: query, $options: 'i' }
    });

    // Search in cities
    results.cities = await CitiesModel.find({
      title: { $regex: query, $options: 'i' }
    });

    // Search in countries
    results.countries = await countriesModel.find({
      title: { $regex: query, $options: 'i' }
    });

    // Search in packages
    results.packages = await PackagesModel.find({
      title: { $regex: query, $options: 'i' }
    });

    // Search in activities
    results.activities = await ActivitiesModel.find({
      title: { $regex: query, $options: 'i' }
    });

    // Search in blogs
    results.blogs = await BlogModel.find({
      title: { $regex: query, $options: 'i' }
    });

    return NextResponse.json({
      status: 200,
      success: true,
      totalResults: Object.values(results).reduce((acc, array) => acc + array.length, 0),
      results
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'An error occurred while fetching search results'
    });
  }
}
