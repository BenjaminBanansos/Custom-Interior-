"use client";

import React, { useState, useEffect } from "react";
import { fetchAdminOrders, confirmOrder, Order } from "@/lib/order_actions";

export default function AdminOrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const handleConfirm = async (id: string) => {
    if (confirm("Verify and confirm this order?")) {
      const success = await confirmOrder(id);
      if (success) {
        setOrders(
          orders.map((o) => (o.id === id ? { ...o, status: "Confirmed" } : o)),
        );
      } else {
        alert("Failed to confirm order.");
      }
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        Wholesale Orders
      </h1>
      <p style={{ color: "#888", marginBottom: "40px" }}>
        Verify, confirm, and manage customer orders and quotes.
      </p>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {orders.map((order) => {
            const items = order.items || [order]; // Support new multi-item carts AND legacy single items

            return (
              <div
                key={order.id}
                style={{
                  border: "1px solid #eaeaea",
                  borderRadius: "12px",
                  padding: "32px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "1px solid #eaeaea",
                    paddingBottom: "20px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h3
                      style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}
                    >
                      {order.id}
                    </h3>
                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#555",
                        fontSize: "0.9rem",
                      }}
                    >
                      <strong>{order.customerName || "Guest"}</strong> (
                      {order.customerEmail || "No email"})
                    </p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#888",
                        fontSize: "0.85rem",
                      }}
                    >
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", fontWeight: 300 }}>
                      $
                      {order.totalPrice ||
                        items.reduce(
                          (sum: number, i: any) => sum + (i.totalPrice || 0),
                          0,
                        )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          backgroundColor:
                            order.status === "Confirmed"
                              ? "#e6f7ff"
                              : "#fffbe6",
                          color:
                            order.status === "Confirmed"
                              ? "#1890ff"
                              : "#faad14",
                          border:
                            "1px solid " +
                            (order.status === "Confirmed"
                              ? "#91d5ff"
                              : "#ffe58f"),
                        }}
                      >
                        {order.status}
                      </span>
                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleConfirm(order.id)}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Verify & Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "#fafafa",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                        }}
                      >
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "1.1rem",
                            fontWeight: 600,
                          }}
                        >
                          {item.productName || "Custom Blind"}
                          {item.details?.roomName &&
                            item.details?.roomName !== "Unspecified Room" && (
                              <span
                                style={{
                                  marginLeft: "10px",
                                  fontSize: "0.7rem",
                                  backgroundColor: "#000",
                                  color: "#fff",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  textTransform: "uppercase",
                                  letterSpacing: "1px",
                                }}
                              >
                                {item.details.roomName}
                              </span>
                            )}
                        </h4>
                        <span style={{ fontWeight: 600 }}>
                          ${item.totalPrice}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "40px" }}>
                        <div style={{ flex: 1 }}>
                          <h5
                            style={{
                              margin: "0 0 8px",
                              fontSize: "0.7rem",
                              color: "#888",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Configuration
                          </h5>
                          <p style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>
                            <strong>Family:</strong>{" "}
                            {item.details?.family || "N/A"}
                          </p>
                          <p style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>
                            <strong>Color:</strong>{" "}
                            {item.details?.color || "N/A"}
                          </p>
                          <p style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>
                            <strong>Size:</strong> {item.width}" W x{" "}
                            {item.height}" H
                          </p>
                          <p style={{ margin: "0", fontSize: "0.9rem" }}>
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5
                            style={{
                              margin: "0 0 8px",
                              fontSize: "0.7rem",
                              color: "#888",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Modifiers
                          </h5>
                          {item.details?.modifiers &&
                          item.details.modifiers.length > 0 ? (
                            item.details.modifiers.map(
                              (mod: string, i: number) => (
                                <p
                                  key={i}
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: "0.9rem",
                                    color: "#444",
                                  }}
                                >
                                  • {mod}
                                </p>
                              ),
                            )
                          ) : (
                            <p
                              style={{
                                margin: 0,
                                fontSize: "0.9rem",
                                color: "#aaa",
                              }}
                            >
                              No modifiers selected
                            </p>
                          )}
                          {item.details?.subAttributes &&
                            item.details.subAttributes.map(
                              (attr: string, i: number) => (
                                <p
                                  key={`sub-${i}`}
                                  style={{
                                    margin: "0 0 4px",
                                    fontSize: "0.9rem",
                                    color: "#444",
                                  }}
                                >
                                  • {attr}
                                </p>
                              ),
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
