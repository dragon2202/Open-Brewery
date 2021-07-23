import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Card from 'antd/lib/card'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Empty from 'antd/lib/empty'
import Input from 'antd/lib/input'

import { Navigation } from '../components/navigation'

export default function Search() {
    const [searchParam, setParam] = useState('')
    const [data, setData] = useState(null)
    const router = useRouter()
    const handleChange = (e) => {
        setParam(e.target.value)
    }

    useEffect(() => {
        fetch('http://api.openbrewerydb.org/breweries')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Open Brewery App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Search Page
                </h1>
                
                <Navigation />
                <Input className="search-bar" placeholder="Search" onChange={handleChange} style={{marginBottom:'20px', marginTop:'20px'}}/>

                <Card className={styles.cardgrid} style={{ backgroundColor: '#DAE0E6'}}>
                    <Row gutter={[16, 16]}>
                        {
                            (data != null) ?
                                data.map((item, index) => {
                                    if ((item.name.toLowerCase()).includes(searchParam.toString().toLowerCase())) {
                                        return (
                                            <Col span={6} key={index} style={{ width:'100vh', maxWidth:'100vh'}}>
                                                <Card title={<Link href={`/detail/${item.id}`}>{item.name}</Link>}>
                                                    Type: {item.brewery_type.charAt(0).toUpperCase() + item.brewery_type.slice(1)}
                                                </Card>
                                            </Col>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                                :
                                <Empty />
                        }
                    </Row>
                </Card>
            </main>
        </div>
    )
}
