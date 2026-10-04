"use client";

import React, { useState } from "react";
import { bulkAppendModifier } from "@/lib/bulk_actions";

export default function BulkEditor() {
  const [category, setCategory] = useState("all");
  const [modifierName, setModifierName] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionImage, setOptionImage] = useState("");
  const [status, setStatus] = useState("");

  const handleApply = async () => {
    if (!modifierName || !optionName) {
      setStatus("Please provide a Modifier Group Name and an Option Name.");
      return;
    }

    setStatus("Applying to products...");

    const newOption = {
      name: optionName,
      price: optionPrice,
      image: optionImage || undefined,
    };

    try {
      const res = await bulkAppendModifier(category, modifierName, [newOption]);
      if (res.success) {
        setStatus(`Success! Appended to ${res.updatedCount} products.`);
      } else {
        setStatus("Failed to apply update.");
      }
    } catch (e: any) {
      setStatus("Error: " + e.message);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Bulk Configurator (Append Mode)
      </h1>
      <p className="text-gray-600 mb-8">
        This tool adds new hardware or modifier options to existing products
        WITHOUT overwriting the entire hardware list. It appends your new option
        to the bottom of the list for the specified modifier group.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Category / Base Product
          </label>
          <select
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Products (Global Apply)</option>
            <option value="Room Darkening">Room Darkening</option>
            <option value="Translucent">Translucent</option>
            <option value="Blackout">Blackout</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modifier Group Name (e.g., "Cassette" or "Bottom Rail")
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Cassette"
            value={modifierName}
            onChange={(e) => setModifierName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Option Name
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="100mm Square Cassette"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Add-on ($)
            </label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={optionPrice}
              onChange={(e) => setOptionPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail / CAD Image Name (e.g., "100mm_cassette.png")
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="100mm_cassette.png"
            value={optionImage}
            onChange={(e) => setOptionImage(e.target.value)}
          />
        </div>

        <button
          onClick={handleApply}
          className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800"
        >
          Append to Products
        </button>

        {status && (
          <div className="mt-4 p-4 rounded bg-gray-50 border border-gray-100 text-sm font-medium">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
