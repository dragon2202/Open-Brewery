import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

import { useRouter } from 'next/router'

import Head from 'next/head'
import styles from '../../styles/Home.module.css'

import Empty from 'antd/lib/empty'
import Card from 'antd/lib/card'

import Breadcrumb from 'antd/lib/breadcrumb'

export default function Detail() {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState(null)
    const [foundObject, setObject] = useState(null)

    //fetches the data based of path id, so you can search when you click similar breweries on this page
    useEffect(() => {
        axios.get('http://api.openbrewerydb.org/breweries')
        .then(res => res)
        .then(res => setData(res.data))
        .catch(error => console.log(error))
    }, [id])
    //Finds the object as soon as fetch is done
    useEffect(() => {
        if (data != null) {
            setObject(data.find(el => el.id == id))
        }
    }, [data])

    return (
        <div className={styles.container}>
            <Head>
                <title>Open Brewery App</title>
                <meta name="description" content="Generated by create next app" />
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main} >
                <h1 className={styles.title}>
                    Detail Page: {id}
                </h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link href={'/'}>Home</Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <Link href={'/search'}>Search</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <span style={{ display: 'flex'}}>
                    {//Card containing details and ternary operator in case detail is missing
                        foundObject != null ?
                            <Card title={foundObject.name} className={styles.detailcard}>
                                <p>ID: {(foundObject.id == null) ? "No Data" : foundObject.id}</p>
                                <p>Brewery Type: {(foundObject.brewery_type == null) ? "No Data" : foundObject.brewery_type.charAt(0).toUpperCase() + foundObject.brewery_type.slice(1)}</p>
                                <p>Street: {(foundObject.street == null) ? "No Data" : foundObject.street}</p>
                                <p>Address: {(foundObject.address_2 == null) ? "No Data" : foundObject.address_2}</p>
                                <p>Address 2: {(foundObject.address_3 == null) ? "No Data" : foundObject.address_3}</p>
                                <p>City: {(foundObject.city == null) ? "No Data" : foundObject.city}</p>
                                <p>State: {(foundObject.state == null) ? "No Data" : foundObject.state}</p>
                                <p>Country Providence: {(foundObject.county_province == null) ? "No Data" : foundObject.county_province}</p>
                                <p>Postal Code: {(foundObject.postal_code == null) ? "No Data" : foundObject.postal_code}</p>
                                <p>Country: {(foundObject.country == null) ? "No Data" : foundObject.country}</p>
                                <p>Longitude: {(foundObject.longitude == null) ? "No Data" : foundObject.longitude}</p>
                                <p>Latitude: {(foundObject.latitude == null) ? "No Data" : foundObject.latitude}</p>
                                <p>Phone Number: {(foundObject.phone == null) ? "No Data" : foundObject.phone}</p>
                                <p>Website Link:{(foundObject.website_url == null) ? "No Data" : foundObject.website_url}</p>
                                <p>Updated At: {(foundObject.updated_at == null) ? "No Data" : foundObject.updated_at}</p>
                                <p>Created At: {(foundObject.created_at == null) ? "No Data" : foundObject.created_at}</p>
                            </Card>
                            :
                            <Empty />
                    }
                    {
                        (foundObject != null) ?
                            <Card title={"Similar Brewery by Type: " + foundObject.brewery_type.charAt(0).toUpperCase() + foundObject.brewery_type.slice(1)} className={styles.similardetail}>
                                {
                                    data.map((item, index) => {
                                        if (item.brewery_type == foundObject.brewery_type) {
                                            return (
                                                <Card key={index}>
                                                    <Link href={`/detail/${item.id}`}>{item.name}</Link>
                                                </Card>

                                            )
                                        }
                                    })
                                }
                            </Card>
                            :
                            <Empty />
                    }
                </span>
            </main>
        </div>
    )
}
