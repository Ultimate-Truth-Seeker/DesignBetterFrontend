import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-layout">
            <header className="admin-header">
                <h1>Admin Panel</h1>
            </header>
            <div className="admin-body">
                <aside className="admin-sidebar">
                    <nav>
                        <ul>
                            <li><a href="/admin/dashboard">Dashboard</a></li>
                            <li><a href="/admin/users">Users</a></li>
                            <li><a href="/admin/settings">Settings</a></li>
                        </ul>
                    </nav>
                </aside>
                <main className="admin-content">
                    {children}
                </main>
            </div>
            
        </div>
    );
}