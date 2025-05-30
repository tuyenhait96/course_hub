'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, CreditCard, Wallet, Building } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const [selectedCourse] = useState({
    id: '1',
    title: 'Introduction to Next.js',
    price: 49.99,
    description: 'Learn the fundamentals of Next.js and build amazing web applications.'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process the payment
    console.log('Processing order:', formData)
    alert('Order submitted successfully! (This is a demo)')
  }

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Wallet },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Building }
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/creator/landing-pages">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Landing Pages
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium">{selectedCourse.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedCourse.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Course Price</span>
                  <span>${selectedCourse.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(selectedCourse.price + 2.99).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your full address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div key={method.id} className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Icon className="h-5 w-5" />
                        <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                          {method.name}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>

                {/* Credit Card Form */}
                {formData.paymentMethod === 'credit-card' && (
                  <div className="space-y-4 border-t pt-4">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="Name on card"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Info */}
                {formData.paymentMethod === 'paypal' && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                )}

                {/* Bank Transfer Info */}
                {formData.paymentMethod === 'bank-transfer' && (
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm font-medium">Bank Transfer Details:</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Account Name: Course Platform Ltd.</p>
                      <p>Account Number: 1234567890</p>
                      <p>Routing Number: 987654321</p>
                      <p>Reference: Your Order ID will be provided after submission</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!formData.name || !formData.email || !formData.phone || !formData.address || !formData.paymentMethod}
            >
              Complete Purchase - ${(selectedCourse.price + 2.99).toFixed(2)}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 