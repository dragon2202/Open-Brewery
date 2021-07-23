import Breadcrumb from 'antd/lib/breadcrumb'

function Navigation() {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link href={'/'}>Home</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <Link href={'/search'}>Search</Link>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export { Navigation }