"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ButtonUI } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Loader2, CreditCard, Building2, Wallet, Bitcoin, Package, CheckCircle2 } from "lucide-react"
import { configurationApi } from "@/lib/configuration-api"
import { orderApi } from "@/lib/order-api"
import type { Configuration } from "@/types/configuration"
import type { PaymentMethod } from "@/types/order"
import { useParams } from "next/navigation"

export default function CheckoutPage() {
  const params = useParams()
  const { configurationId } = params
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [configuration, setConfiguration] = useState<Configuration | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank_transfer")

  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        setIsLoading(true)
        const config = await configurationApi.getConfiguration(configurationId as string)
        setConfiguration(config)
      } catch (error) {
        console.error("[v0] Error loading configuration:", error)
        alert("Error al cargar la configuración")
      } finally {
        setIsLoading(false)
      }
    }

    loadConfiguration()
  }, [configurationId])

  const handleConfirmPurchase = async () => {
    if (!configuration) return

    try {
      setIsSubmitting(true)

      // Create order
      const order = await orderApi.createOrder({
        user_id: "user_1", // Mock user ID - replace with actual auth
        configuration_id: configuration.id,
        designer_id: configuration.template_id ? `designer_${configuration.template_id}` : undefined,
        payment_method: paymentMethod,
        total_amount: configuration.price_total,
      })

      console.log("[v0] Order created successfully:", order)

      // Redirect to orders page
      router.push("/dashboard/cliente/pedidos")
    } catch (error) {
      console.error("[v0] Error creating order:", error)
      alert("Error al crear el pedido")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!configuration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Configuración no encontrada</p>
      </div>
    )
  }

  const paymentMethods = [
    {
      id: "bank_transfer" as PaymentMethod,
      name: "Transferencia Bancaria",
      description: "Paga mediante transferencia bancaria directa",
      icon: Building2,
    },
    {
      id: "cash_on_delivery" as PaymentMethod,
      name: "Pago Contra Entrega",
      description: "Paga en efectivo al recibir tu pedido",
      icon: Package,
    },
    {
      id: "paypal" as PaymentMethod,
      name: "PayPal",
      description: "Paga de forma segura con tu cuenta PayPal",
      icon: Wallet,
    },
    {
      id: "credit_card" as PaymentMethod,
      name: "Tarjeta de Crédito/Débito",
      description: "Paga con Visa, Mastercard o American Express",
      icon: CreditCard,
    },
    {
      id: "crypto" as PaymentMethod,
      name: "Criptomonedas",
      description: "Paga con Bitcoin, Ethereum u otras criptomonedas",
      icon: Bitcoin,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Finalizar Pedido</h1>
          <p className="text-muted-foreground mt-2">Revisa tu pedido y selecciona el método de pago</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Method */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
              <p className="text-sm text-muted-foreground mb-6">Selecciona cómo deseas realizar el pago de tu pedido</p>

              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3 mb-1">
                          <method.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{method.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>

            {/* Order Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Opciones Seleccionadas</h3>
                  <div className="space-y-1">
                    {Object.entries(configuration.selected_options || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Materiales</h3>
                  <div className="space-y-1">
                    {Object.entries(configuration.material_assignments || {}).map(([piece, material]) => (
                      <div key={piece} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{piece}:</span>
                        <span className="font-medium">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Origen de Medidas</h3>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Fuente:</span>{" "}
                    <span className="font-medium capitalize">{configuration.measurement_source}</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio base:</span>
                  <span>${configuration.cost_breakdown?.base_price || 0}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Materiales:</span>
                  <span>
                    $
                    {Object.values(configuration.cost_breakdown?.material_costs || {}).reduce(
                      (sum, cost) => sum + cost,
                      0,
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Personalización:</span>
                  <span>${configuration.cost_breakdown?.customization_fees || 0}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${configuration.price_total}</span>
                </div>
              </div>

              <ButtonUI onClick={handleConfirmPurchase} disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Confirmar Pedido
                  </>
                )}
              </ButtonUI>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Al confirmar, aceptas nuestros términos y condiciones
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
