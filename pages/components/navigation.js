import React from 'react'
import Menu from 'antd/lib/menu'

export default function Navigation() {
    return (
        <nav>
            <div className="menu-content-container">
                <Menu mode="horizontal">
                    <Menu.Item key="home-page">
                        Home Page
                    </Menu.Item>

                    <Menu.Item key="search-page">
                        Search Page
                    </Menu.Item>
                </Menu>
            </div>
        </nav>
    )
}