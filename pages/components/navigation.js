import Breadcrumb from 'antd/lib/breadcrumb'

function Navigation() {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <a href="/"> Home</a>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <a href="/search"> Search</a>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <a href="/detail">Detail</a>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export { Navigation }