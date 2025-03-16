"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function CategoryFilter() {
    const router = useRouter();
    
    const filterOptions = [
        { id: 1, name: "All", value: "all", path: "/browse" },
        { id: 2, name: "ML/AI", value: "ml-ai", path: "/categories/ml-ai" },
        { id: 3, name: "WEB DEV", value: "web-dev", path: "/categories/web-dev" },
        { id: 4, name: "MOBILE DEV", value: "mobile-dev", path: "/categories/mobile-dev" },
        { id: 5, name: "Cloud Computing", value: "cloud-computing", path: "/categories/cloud-computing" },
        { id: 6, name: "DevOps", value: "devops", path: "/categories/devops" },
        { id: 7, name: "MLOps", value: "mlops", path: "/categories/mlops" },
        { id: 8, name: "DSA", value: "dsa", path: "/categories/dsa" },
    ];

    const [activeFilter, setActiveFilter] = useState("all");

    const handleFilterClick = (value, path) => {
        setActiveFilter(value);
        router.push(path);
    };

    return (
        <div className="flex flex-wrap gap-3">
            {filterOptions.map((item) => (
                <button
                    key={item.id}
                    className={`border p-2 px-4 text-[12px] rounded-md font-semibold transition-all duration-300 ${
                        activeFilter === item.value
                            ? "bg-purple-100 text-purple-800 border-purple-800"
                            : "hover:border-purple-800 hover:bg-purple-50"
                    }`}
                    onClick={() => handleFilterClick(item.value, item.path)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
