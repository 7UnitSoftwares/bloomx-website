import Link from 'next/link';

export default function AdminNav() {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/admin" className="text-xl font-bold text-[#008C95]">
                                Bloom Admin
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/admin/blog-editor"
                                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                            >
                                ✏️ Blog Editor
                            </Link>
                            <Link
                                href="/admin/blog-manager"
                                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                            >
                                📋 Blog Manager
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            ← Back to Site
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
