import React, { useState } from 'react';

const SearchBar = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="relative z-20 w-1/5 max-w-md">
            

            <div className="hidden lg:flex relative items-center bg-opacity-90 border border-gray-300 rounded-full px-4 py-2 shadow-md w-full h-[55px]">
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow bg-transparent outline-none text-white placeholder-white pr-28"
                />
                <button className="absolute right-2 bg-primary text-white px-4 py-1 rounded-full hover:scale-105 transition-transform">
                    Search
                </button>
            </div>

            {/* Small/medium screens: toggleable input */}
            <div className="flex lg:hidden items-center justify-end">
                {!searchOpen ? (
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="text-white px-4 py-2 rounded-full border border-gray-400 bg-primary bg-opacity-80 hover:scale-105 transition"
                    >
                        Search
                    </button>
                ) : (
                        <div className="relative flex items-center bg-opacity-90 border border-gray-300 rounded-full px-4 py-2 shadow-md w-full max-w-xs">
                        <input
                            type="text"
                                placeholder="Search"
                                className="flex-grow bg-transparent outline-none text-white placeholder-white pr-24"
                        />
                        <button
                            onClick={() => setSearchOpen(false)}
                                className="absolute right-2 bg-primary text-white px-4 py-1 rounded-full hover:scale-105 transition-transform"
                        >
                            Go
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
