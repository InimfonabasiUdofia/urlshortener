import React, { useEffect, useState } from 'react';
import { Copy, Check, ExternalLink, Trash2, BarChart3, Search, Link } from 'lucide-react';
import Navbar from '../components/navbar';

// Define the interface based on your API response
interface ShortenedUrl {
    id: number;
    url: string;
    urlcode: string;
    time: string;
}

export default function Details() {
    const [copied, setCopied] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [links, setLinks] = useState<ShortenedUrl[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
        console.log(localStorage.getItem('token'))
        console.log(token); // replace 'token' with your actual key


    const detailFunction = async (): Promise<void> => {
    try {
        setLoading(true);
        setError(null);

        // Get the token from localStorage

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Fetch with Authorization header
        const response = await fetch("http://localhost:8080/api/details", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data: ShortenedUrl[] = await response.json();
        setLinks(data);
        console.log(data);
    } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
        setLoading(false);
    }
};


    const handleCopy = async (shortUrl: string, id: number): Promise<void> => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (confirm('Are you sure you want to delete this link?')) {
            try {
                // Add your delete API call here
                const response = await fetch(`http://localhost:8080/api/url/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setLinks(links.filter(link => link.id !== id));
                }
            } catch (err) {
                console.error('Failed to delete:', err);
            }
        }
    };

    useEffect(() => {
        detailFunction();
    }, []);

    // Filter links based on search query
    const filteredLinks = links.filter(link =>
        link.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.urlcode?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Build full short URL
    const getShortUrl = (urlcode: string): string => {
        return `http://localhost:8080/${urlcode}`;
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-black p-4 lg:mt-15 mt-13 py-8">
            <div className="mx-auto md:px-20 lg:px-25">
                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-lg p-5">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                            <Link className="w-4 h-4 text-black" />
                            My Shortened Links
                        </h1>
                        <p className="text-gray-600">Manage and track all your shortened URLs</p>
                    </div>

                    <div className="bg-white shadow p-5">
                        <div className="text-2xl font-bold text-black mb-1">{links.length}</div>
                        <div className="text-gray-600 text-sm">Total Links</div>
                    </div>
                </div>

             
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        <p>Error: {error}</p>
                    </div>
                )}

                {/* Links List */}
                <div className="space-y-4 pt-5">
                    {loading ? (
                        <div className="bg-white  shadow p-12 text-center">
                            <p className="text-gray-600">Loading...</p>
                        </div>
                    ) : (
                        filteredLinks.map((link) => (
                            <div key={link.id} className="bg-white  shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                                    {/* URLs Section */}
                                    <div className="lg:col-span-7 space-y-3">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Original URL
                                            </label>
                                            <p className="text-gray-700 break-all text-sm mt-1">{link.url}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                                Short URL
                                            </label>
                                            <p className="text-blue-600 font-medium break-all mt-1">
                                                {getShortUrl(link.urlcode)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Stats Section */}
                                    <div className="lg:col-span-2 flex lg:flex-col gap-4 lg:gap-2 text-center lg:text-left">
                                       
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">
                                                {formatDate(link.time)}
                                            </div>
                                            
                                        </div>
                                    </div>

                                    {/* Actions Section */}
                                    <div className="lg:col-span-3 flex gap-2">
                                        <button
                                            onClick={() => handleCopy(getShortUrl(link.urlcode), link.id)}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium py-2 px-4  transition-colors flex items-center justify-center gap-2 text-sm"
                                        >
                                            {copied === link.id ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => window.open(getShortUrl(link.urlcode), '_blank')}
                                            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
                                            title="Visit link"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
                                            title="Delete link"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Create New Link Button */}
               
            </div>
        </div>
        </>
    );
}