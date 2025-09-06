import React from 'react';

const ShopifyDashboardMock = () => {
    return (
        <div style={{ fontFamily: 'Inter, Arial, sans-serif', background: '#f6f6f7', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ background: '#111112', color: '#fff', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ background: '#6f42c1', borderRadius: 6, padding: '2px 8px', fontWeight: 900, fontSize: 20 }}>S</span>
                        shopify
                    </div>
                    <span style={{ background: '#222', color: '#fff', borderRadius: 8, padding: '2px 8px', fontSize: 14, marginLeft: 8 }}>Summer '25</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>🔍</button>
                    <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>😎</button>
                    <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>🔔</button>
                    <span style={{ background: '#00c04b', color: '#111', borderRadius: 8, padding: '4px 12px', fontWeight: 700 }}>MS</span>
                    <span style={{ fontWeight: 600 }}>My Store</span>
                </div>
            </header>
            {/* Main Layout */}
            <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
                {/* Sidebar */}
                <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '24px 0', minHeight: '100vh' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <SidebarItem icon="🏠" label="Home" active />
                        <SidebarItem icon="📦" label="Orders" />
                        <SidebarItem icon="🏷️" label="Products" />
                        <SidebarItem icon="👤" label="Customers" />
                        <SidebarItem icon="📣" label="Marketing" />
                        <SidebarItem icon="💸" label="Discounts" />
                        <SidebarItem icon="📝" label="Content" />
                        <SidebarItem icon="🌐" label="Markets" />
                        <SidebarItem icon="📊" label="Analytics" />
                        <div style={{ margin: '16px 0 0 0', color: '#888', fontSize: 13, paddingLeft: 24 }}>Sales channels</div>
                        <SidebarItem icon="🛒" label="Online Store" />
                        <div style={{ margin: '16px 0 0 0', color: '#888', fontSize: 13, paddingLeft: 24 }}>Apps</div>
                        <SidebarItem icon="＋" label="Add" />
                        <div style={{ marginTop: 'auto', color: '#888', fontSize: 13, paddingLeft: 24, position: 'absolute', bottom: 24 }}>Settings</div>
                    </nav>
                </aside>
                {/* Main Content */}
                <main style={{ flex: 1, padding: '32px 48px', position: 'relative' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Welcome to Shopify</h1>
                    <div style={{ background: 'linear-gradient(90deg, #1e293b 60%, #111112 100%)', color: '#fff', borderRadius: 12, padding: '20px 32px', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Get 6 months for just $1/month</div>
                            <div style={{ fontSize: 15, marginTop: 4 }}>Your trial ends on August 27. Select a plan to continue building.</div>
                        </div>
                        <button style={{ background: '#fff', color: '#111', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Select a plan</button>
                    </div>
                    <div style={{ display: 'flex', gap: 32 }}>
                        <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 32, minHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <a href="#" style={{ color: '#1e293b', fontWeight: 600, fontSize: 18, textDecoration: 'underline', marginBottom: 16 }}>Add store name</a>
                            <div style={{ width: 120, height: 120, background: '#f6f6f7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                                <span style={{ fontSize: 64, color: '#bbb' }}>☕</span>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Add your first product</div>
                            <div style={{ color: '#555', fontSize: 15, textAlign: 'center', marginBottom: 8 }}>Start by adding a product and a few key details. Not ready? <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>Start with a sample product</a></div>
                        </div>
                        <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 32, minHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 120, height: 120, background: '#f6f6f7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                                <span style={{ fontSize: 64, color: '#bbb' }}>🖼️</span>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Design your store</div>
                            <div style={{ color: '#555', fontSize: 15, textAlign: 'center' }}>Describe your business to generate custom themes or <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>browse pre-designed themes</a></div>
                        </div>
                    </div>
                    {/* Trial badge */}
                    <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#111', color: '#fff', borderRadius: 12, padding: '12px 24px', fontWeight: 600, fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        3 days left in your trial
                    </div>
                </main>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, label, active }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '10px 32px',
        background: active ? '#f6f6f7' : 'none',
        color: active ? '#111' : '#222',
        fontWeight: active ? 700 : 500,
        borderLeft: active ? '4px solid #6f42c1' : '4px solid transparent',
        cursor: 'pointer',
        fontSize: 16,
        borderRadius: 6,
        marginBottom: 2
    }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        {label}
    </div>
);

export default ShopifyDashboardMock;
