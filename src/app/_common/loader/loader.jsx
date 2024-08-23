'use client'
import React from 'react'
import { Oval } from 'react-loader-spinner'

function FormLoader() {
    return (
        <>
        <div className="button_loading" style={{zIndex:'99999999999999999'}}>

            <Oval
                visible={true}
                height="40"
                width="40"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
        </>
    )
}

export default FormLoader
