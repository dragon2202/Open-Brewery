import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Card from 'antd/lib/card'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Empty from 'antd/lib/empty'
import Breadcrumb from 'antd/lib/breadcrumb'

export default function Home() {
  const [data, setData] = useState(null)
  const [brewery_type, setType] = useState('All')
  const router = useRouter()
  var random = Math.floor(Math.random() * 20)

  //Fetches data to set in a useState
  useEffect(() => {
    fetch('http://api.openbrewerydb.org/breweries')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.log(error))
  }, [])

  //Sets Brewery Type
  const handleType = (type) => {
    setType(type)
  }

  //Maps out all brewery type existing in the data
  const BreweryType = (item) => {
    const unique = [...new Set(item.map(item => item.brewery_type))]
    return unique.map((item, index) => {
      return (
        <a key={index} onClick={() => handleType(item)}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </a>
      )
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Open Brewery App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Home
        </h3>

        <Breadcrumb>
            <Breadcrumb.Item>
                <Link href={'/'}>Home</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <Link href={'/search'}>Search</Link>
            </Breadcrumb.Item>
        </Breadcrumb>

        <Card style={{ marginTop: '20px', marginBottom: '20px'}}>
          {(data == null) ? "Post not available" : <a onClick={() => router.push(`/detail/${data[random].id}`)}>{"Featured: " + data[random].name}</a>}
        </Card>
        <Card className={styles.cardgrid} style={{ backgroundColor: '#DAE0E6' }}>
          <div className={styles.topnav}>
            <a key={0} onClick={() => handleType("All")}>All</a>
            {(data != null) ? BreweryType(data) : null}
          </div>

          <h3>Current Filter Type: {brewery_type.charAt(0).toUpperCase() + brewery_type.slice(1)}</h3>

          <Row gutter={[16, 16]}>
            {// Maps out based of brewery type or all types
              (data != null) ?
                data.map((item, index) => {
                  if(item.brewery_type == brewery_type || brewery_type === "All") {
                    return (
                      <Col span={6} key={index}  style={{ width:'100vh', maxWidth:'100vh'}}>
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
