"use client";

import { useState } from "react";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function Cart({ isOpen, onClose, cart, setCart }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [delivery, setDelivery] = useState("standard");
  const [orderDetails, setOrderDetails] = useState(null);

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = delivery === "express" ? 5000 : 2500;
  const total = subtotal + deliveryFee;

  const formatPrice = (price) => `₦${Number(price).toLocaleString("en-NG")}`;

  const closeCart = () => {
    setCheckoutOpen(false);
    setOrderComplete(false);
    setOrderDetails(null);
    onClose();
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) return;

    const formData = new FormData(event.currentTarget);

    const orderReference = `VLR-${Date.now().toString().slice(-8)}`;

    setOrderDetails({
      reference: orderReference,
      name: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      delivery,
      items: cart.map((item) => ({ ...item })),
      subtotal,
      deliveryFee,
      total,
    });

    setCart([]);
    setOrderComplete(true);
    setCheckoutOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-hidden bg-[#faf8f5] shadow-2xl">
        {/* ORDER CONFIRMATION */}
        {orderComplete ? (
          <div className="flex h-full flex-col overflow-y-auto p-6">
            <div className="py-6 text-center">
              <CheckCircle
                size={50}
                strokeWidth={1}
                className="mx-auto text-green-700"
              />

              <p className="mt-5 text-xs uppercase tracking-[3px] text-[#926B70]">
                VÉLORA
              </p>

              <h2 className="mt-3 font-serif text-3xl text-[#48252F]">
                Order Confirmed!
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Thank you, {orderDetails?.name}. Your order has been placed.
              </p>

              <div className="mt-5 bg-[#eee8e2] p-4">
                <p className="text-xs text-gray-500">YOUR ORDER REFERENCE</p>
                <p className="mt-2 text-sm font-semibold tracking-wider text-[#48252F]">
                  {orderDetails?.reference}
                </p>
              </div>
            </div>

            {/* DELIVERY DETAILS */}
            <div className="space-y-5 border-t border-[#e5ddd5] py-6">
              <section>
                <h3 className="mb-3 font-serif text-lg text-[#48252F]">
                  Delivery Details
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>{orderDetails?.name}</p>
                  <p>{orderDetails?.phone}</p>
                  <p>{orderDetails?.email}</p>
                  <p>
                    {orderDetails?.address}, {orderDetails?.city},{" "}
                    {orderDetails?.state}
                  </p>
                  <p className="font-medium text-[#48252F]">
                    {orderDetails?.delivery === "express"
                      ? "Express Delivery"
                      : "Standard Delivery"}
                  </p>
                </div>
              </section>

              {/* ITEMS ORDERED */}
              <section>
                <h3 className="mb-3 font-serif text-lg text-[#48252F]">
                  Items Ordered
                </h3>

                {orderDetails?.items.map((item) => (
                  <div
                    key={item.id}
                    className="mb-3 flex justify-between gap-3 text-sm"
                  >
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>

                    <span className="shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </section>

              {/* ORDER TOTAL */}
              <section className="space-y-3 border-t border-[#e5ddd5] pt-5 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(orderDetails?.subtotal || 0)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{formatPrice(orderDetails?.deliveryFee || 0)}</span>
                </div>

                <div className="flex justify-between border-t border-[#e5ddd5] pt-4 font-semibold text-[#48252F]">
                  <span>Total</span>
                  <span>{formatPrice(orderDetails?.total || 0)}</span>
                </div>
              </section>
            </div>

            <p className="text-center text-xs leading-5 text-gray-400">
              This is a demonstration order. No payment has been collected, and
              the order has not been sent to a store.
            </p>

            <button
              onClick={closeCart}
              className="mt-6 w-full bg-[#48252F] py-4 text-xs tracking-[2px] text-white transition hover:bg-[#68404a]"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : checkoutOpen ? (
          <>
            {/* CHECKOUT HEADER */}
            <div className="flex items-center gap-4 border-b border-[#e5ddd5] p-6">
              <button
                onClick={() => setCheckoutOpen(false)}
                aria-label="Back to shopping bag"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <h2 className="font-serif text-2xl">Checkout</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Complete your delivery details
                </p>
              </div>

              <button
                onClick={closeCart}
                className="ml-auto"
                aria-label="Close checkout"
              >
                <X size={22} />
              </button>
            </div>

            {/* CHECKOUT FORM */}
            <form
              onSubmit={placeOrder}
              className="flex flex-1 flex-col overflow-y-auto"
            >
              <div className="flex-1 space-y-6 overflow-y-auto p-6">
                {/* CONTACT INFORMATION */}
                <section>
                  <h3 className="mb-4 font-serif text-xl text-[#48252F]">
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      required
                      autoComplete="name"
                      className="w-full border border-[#ddd3cb] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#48252F]"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      autoComplete="email"
                      className="w-full border border-[#ddd3cb] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#48252F]"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      autoComplete="tel"
                      className="w-full border border-[#ddd3cb] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#48252F]"
                    />
                  </div>
                </section>

                {/* DELIVERY ADDRESS */}
                <section>
                  <h3 className="mb-4 font-serif text-xl text-[#48252F]">
                    Delivery Address
                  </h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      required
                      autoComplete="street-address"
                      className="w-full border border-[#ddd3cb] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#48252F]"
                    />

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      autoComplete="address-level2"
                      className="w-full border border-[#ddd3cb] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#48252F]"
                    />

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      required
                      autoComplete="address-level1"
                      className="w-full border border-[#ddd3cb] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#48252F]"
                    />
                  </div>
                </section>

                {/* DELIVERY OPTION */}
                <section>
                  <h3 className="mb-4 font-serif text-xl text-[#48252F]">
                    Delivery Option
                  </h3>

                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-center justify-between border border-[#ddd3cb] p-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          checked={delivery === "standard"}
                          onChange={() => setDelivery("standard")}
                        />

                        <div>
                          <p className="text-sm font-medium">
                            Standard Delivery
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Regular delivery
                          </p>
                        </div>
                      </div>

                      <span className="text-sm">₦2,500</span>
                    </label>

                    <label className="flex cursor-pointer items-center justify-between border border-[#ddd3cb] p-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          value="express"
                          checked={delivery === "express"}
                          onChange={() => setDelivery("express")}
                        />

                        <div>
                          <p className="text-sm font-medium">
                            Express Delivery
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Priority delivery
                          </p>
                        </div>
                      </div>

                      <span className="text-sm">₦5,000</span>
                    </label>
                  </div>
                </section>

                {/* ORDER SUMMARY */}
                <section className="border-t border-[#e5ddd5] pt-5">
                  <h3 className="mb-4 font-serif text-xl text-[#48252F]">
                    Order Summary
                  </h3>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="mb-3 flex justify-between gap-4 text-sm"
                    >
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>

                      <span className="shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}

                  <div className="mt-5 space-y-3 border-t border-[#e5ddd5] pt-4 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>

                    <div className="flex justify-between border-t border-[#e5ddd5] pt-4 font-semibold text-[#48252F]">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* PLACE ORDER */}
              <div className="border-t border-[#e5ddd5] p-6">
                <button
                  type="submit"
                  className="w-full bg-[#48252F] py-4 text-xs tracking-[2px] text-white transition hover:bg-[#68404a]"
                >
                  PLACE ORDER · {formatPrice(total)}
                </button>

                <p className="mt-3 text-center text-[10px] text-gray-400">
                  Demo checkout · No payment will be collected
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* SHOPPING BAG HEADER */}
            <div className="flex items-center justify-between border-b border-[#e5ddd5] p-6">
              <div>
                <h2 className="font-serif text-2xl">Your Shopping Bag</h2>

                <p className="mt-1 text-xs text-gray-500">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>
              </div>

              <button onClick={closeCart} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            {/* CART ITEMS */}
            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={38} strokeWidth={1} />

                  <h3 className="mt-5 font-serif text-xl">Your bag is empty</h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Discover something beautiful.
                  </p>

                  <button
                    onClick={closeCart}
                    className="mt-6 bg-[#48252F] px-7 py-3 text-xs tracking-widest text-white"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-[#e5ddd5] pb-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-24 object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-base">{item.name}</h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.color}
                        </p>

                        <p className="mt-2 text-sm">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 border border-[#ddd3cb] px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="text-xs">{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            setCart((prev) =>
                              prev.filter((p) => p.id !== item.id),
                            )
                          }
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* CART FOOTER */}
            {cart.length > 0 && (
              <div className="border-t border-[#e5ddd5] p-6">
                <div className="mb-5 flex justify-between">
                  <span className="text-sm">Subtotal</span>

                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                <p className="mb-4 text-xs text-gray-500">
                  Delivery charges are calculated at checkout.
                </p>

                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full bg-[#48252F] py-4 text-xs tracking-[2px] text-white transition hover:bg-[#68404a]"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
