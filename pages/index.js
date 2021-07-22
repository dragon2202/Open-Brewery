import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Slider from 'antd/lib/slider'

import { Navigation } from './components/navigation'
import { NormalFetch } from './api/fetch'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Open Brewery App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Home
        </h1>

        <Row gutter={[24, 24]}>
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />

          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
        </Row>
        <Button onClick={() => NormalFetch()}>Button</Button>
      </main>
    </div>

  )
}
