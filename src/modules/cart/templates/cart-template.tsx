import { type FC, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardTitle } from "@/core/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group";
import { Label } from "@/core/components/ui/label";
import { Input } from "@/core/components/ui/input";
import { Separator } from "@/core/components/ui/separator";
import { useCartStore, useCartSubtotal } from "../store/cart-store";
import { CartItemCard } from "../components/cart-item";

export const CartTemplate: FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    couponCode,
    clearCart,
  } = useCartStore();
  const subtotal = useCartSubtotal();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [discountCode, setDiscountCode] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handlePlaceOrder = () => {
    setIsSuccessDialogOpen(true);
  };

  const handleGoHome = () => {
    clearCart();
    setIsSuccessDialogOpen(false);
    navigate({ to: "/" });
  };

  // Calculate order totals
  const shippingCost = 599;
  const discount = couponCode ? 50 : 0;
  const total = subtotal + shippingCost - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-screen-2xl px-6 py-12">
          <div className="flex flex-col items-center justify-center py-24">
            <ShoppingCart className="size-24 text-muted-foreground/50" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="mt-6">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-screen-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <span className="text-muted-foreground">
            {items.length} {items.length === 1 ? "Item" : "Items"} in cart
          </span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column - Cart Items + Coupon/Summary */}
          <div className="flex-1 space-y-6">
            {/* Cart Items */}
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              {items.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={(quantity) =>
                    updateQuantity(item.product.id, quantity)
                  }
                  onRemove={() => removeItem(item.product.id)}
                />
              ))}
            </div>

            {/* Coupon Code + Order Summary */}
            <Card className="shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                  {/* Coupon Code */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold">Coupon Code</h3>
                    <p className="text-muted-foreground">
                      Enter code to get discount instantly
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Add discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="rounded-full"
                      />
                      <Button
                        onClick={() => {
                          if (discountCode.trim()) {
                            applyCoupon(discountCode.trim());
                            setDiscountCode("");
                          }
                        }}
                        className="rounded-full px-6"
                      >
                        Apply
                      </Button>
                    </div>
                    {couponCode && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Applied: {couponCode}</span>
                        <button
                          onClick={removeCoupon}
                          className="text-destructive hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping Cost</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Discount</span>
                      <span>${discount.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Payable</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Info */}
          <div className="w-full space-y-6 lg:w-96">
            <Card className="shadow-none">
              <CardContent>
                <CardTitle className="mb-6 text-xl">Payment Info</CardTitle>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card">Credit card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">Paypal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on delivery</Label>
                  </div>
                </RadioGroup>
                <Separator className="my-6" />
                <div className="space-y-6">
                  <div className="space-y-3.5">
                    <Label
                      htmlFor="card-name"
                      className="text-base font-normal"
                    >
                      Name on Card:
                    </Label>
                    <Input type="text" id="card-name" placeholder="John Joe" />
                  </div>
                  <div className="space-y-3.5">
                    <Label
                      htmlFor="card-number"
                      className="text-base font-normal"
                    >
                      Card Number
                    </Label>
                    <Input
                      type="text"
                      id="card-number"
                      placeholder="0000 0000 0000 1235"
                    />
                  </div>
                  <div className="flex gap-6">
                    <div className="grow space-y-3.5">
                      <Label className="text-base font-normal">
                        Expiration Date:
                      </Label>
                      <div className="mt-2 flex gap-3.5">
                        <Input type="text" placeholder="25" />
                        <Input type="text" placeholder="2027" />
                      </div>
                    </div>
                    <div className="space-y-3.5">
                      <Label
                        htmlFor="card-cvv"
                        className="text-base font-normal"
                      >
                        CVV
                      </Label>
                      <Input type="text" id="card-cvv" placeholder="248" />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="text-center sm:max-w-md">
          <DialogHeader className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:justify-center">
            <Button onClick={handleGoHome} className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
