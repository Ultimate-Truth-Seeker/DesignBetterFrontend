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
            <style jsx>{`
                .admin-layout {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                }
                .admin-header {
                    background: #333;
                    color: #fff;
                    padding: 1rem;
                    text-align: center;
                }
                .admin-body {
                    display: flex;
                    flex: 1;
                }
                .admin-sidebar {
                    width: 250px;
                    background: #f4f4f4;
                    padding: 1rem;
                }
                .admin-content {
                    flex: 1;
                    padding: 1rem;
                }
            `}</style>
        </div>
    );
}