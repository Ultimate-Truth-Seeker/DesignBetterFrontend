"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { HelpCircle, Save, ArrowRight, ArrowLeft, User } from "lucide-react"
import { MEASUREMENT_SCHEMA, MEASUREMENT_GUIDES, type BodyProfile } from "@/types/body-measurement"
import { MeasurementGuideDialog } from "@/components/measurement-guide-dialog"
import { BodyProfileStorage } from "@/lib/body-profile-storage"

export default function PersonalizarTemplatePage({
  params,
}: {
  params: { templateId: string }
}) {
  const { templateId } = params
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  // Body measurements state
  const [profileName, setProfileName] = useState("")
  const [gender, setGender] = useState<"male" | "female" | "unisex" | "other">("unisex")
  const [sizeSystem, setSizeSystem] = useState<"US" | "EU" | "UK" | "custom">("EU")
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric")
  const [measurements, setMeasurements] = useState<Record<string, number>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Guide dialog state
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)

  // Load existing profiles
  const [savedProfiles, setSavedProfiles] = useState<BodyProfile[]>([])
  const [selectedProfileId, setSelectedProfileId] = useState<string>("")

  useEffect(() => {
    setSavedProfiles(BodyProfileStorage.getProfiles())
  }, [])

  const handleMeasurementChange = (code: string, value: string) => {
    const numValue = Number.parseFloat(value)

    if (value === "") {
      const newMeasurements = { ...measurements }
      delete newMeasurements[code]
      setMeasurements(newMeasurements)
      return
    }

    if (isNaN(numValue)) return

    const schema = MEASUREMENT_SCHEMA.find((m) => m.code === code)
    if (!schema) return

    // Validate range
    if (numValue < schema.min || numValue > schema.max) {
      setErrors({
        ...errors,
        [code]: `Debe estar entre ${schema.min} y ${schema.max} ${schema.unit}`,
      })
    } else {
      const newErrors = { ...errors }
      delete newErrors[code]
      setErrors(newErrors)
    }

    setMeasurements({ ...measurements, [code]: numValue })
  }

  const validateMeasurements = (): boolean => {
    const newErrors: Record<string, string> = {}

    MEASUREMENT_SCHEMA.forEach((schema) => {
      if (schema.required && !measurements[schema.code]) {
        newErrors[schema.code] = "Este campo es obligatorio"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveProfile = () => {
    if (!profileName.trim()) {
      alert("Por favor ingresa un nombre para el perfil")
      return
    }

    if (!validateMeasurements()) {
      alert("Por favor completa todas las medidas obligatorias correctamente")
      return
    }

    const profile: BodyProfile = {
      id: selectedProfileId || `profile_${Date.now()}`,
      name: profileName,
      gender,
      size_system: sizeSystem,
      unit_system: unitSystem,
      measures: measurements,
      version: 1,
      created_at: new Date().toISOString(),
    }

    BodyProfileStorage.saveProfile(profile)
    setSavedProfiles(BodyProfileStorage.getProfiles())
    alert("Perfil guardado exitosamente")
  }

  const handleLoadProfile = (profileId: string) => {
    const profile = BodyProfileStorage.getProfile(profileId)
    if (profile) {
      setSelectedProfileId(profile.id)
      setProfileName(profile.name)
      setGender(profile.gender)
      setSizeSystem(profile.size_system)
      setUnitSystem(profile.unit_system)
      setMeasurements(profile.measures)
    }
  }

  const handleNextStep = () => {
    if (!validateMeasurements()) {
      alert("Por favor completa todas las medidas obligatorias correctamente")
      return
    }

    // Save profile automatically before proceeding
    if (profileName.trim()) {
      handleSaveProfile()
    }

    setCurrentStep(1)
    // TODO: Navigate to next step (template options)
  }

  const steps = [
    { id: 0, name: "Medidas Corporales", icon: User },
    { id: 1, name: "Opciones de Plantilla", icon: ArrowRight },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Personalizar Plantilla</h1>
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 0 && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Selection */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Perfil de Medidas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="profile-select">Cargar perfil guardado</Label>
                  <Select value={selectedProfileId} onValueChange={handleLoadProfile}>
                    <SelectTrigger id="profile-select">
                      <SelectValue placeholder="Seleccionar perfil..." />
                    </SelectTrigger>
                    <SelectContent>
                      {savedProfiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name} ({profile.gender}, {profile.size_system})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-name">Nombre del perfil *</Label>
                  <Input
                    id="profile-name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Ej: Mi perfil principal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select value={gender} onValueChange={(v: any) => setGender(v)}>
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size-system">Sistema de tallas</Label>
                  <Select value={sizeSystem} onValueChange={(v: any) => setSizeSystem(v)}>
                    <SelectTrigger id="size-system">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="EU">EU</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit-system">Sistema de unidades</Label>
                  <Select value={unitSystem} onValueChange={(v: any) => setUnitSystem(v)}>
                    <SelectTrigger id="unit-system">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Métrico (cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Measurements */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Medidas Corporales</h2>
                <Button onClick={handleSaveProfile} variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Perfil
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MEASUREMENT_SCHEMA.map((schema) => (
                  <div key={schema.code} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={schema.code} className="flex items-center gap-2">
                        {schema.display_name}
                        {schema.required && <span className="text-destructive">*</span>}
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setSelectedGuide(schema.code)}
                      >
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Input
                        id={schema.code}
                        type="number"
                        min={schema.min}
                        max={schema.max}
                        step="0.5"
                        value={measurements[schema.code] || ""}
                        onChange={(e) => handleMeasurementChange(schema.code, e.target.value)}
                        placeholder={`${schema.min}-${schema.max}`}
                        className={errors[schema.code] ? "border-destructive" : ""}
                      />
                      <div className="flex items-center justify-center w-12 text-sm text-muted-foreground bg-muted rounded-md">
                        {schema.unit}
                      </div>
                    </div>

                    {errors[schema.code] && <p className="text-sm text-destructive">{errors[schema.code]}</p>}

                    {schema.formula_notes && !errors[schema.code] && (
                      <p className="text-xs text-muted-foreground">{schema.formula_notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <Button onClick={handleNextStep}>
                Siguiente: Opciones de Plantilla
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Opciones de Plantilla</h2>
              <p className="text-muted-foreground">Esta sección se implementará en el siguiente paso...</p>
            </Card>
          </div>
        )}
      </div>

      {/* Measurement Guide Dialog */}
      {selectedGuide && MEASUREMENT_GUIDES[selectedGuide] && (
        <MeasurementGuideDialog
          guide={MEASUREMENT_GUIDES[selectedGuide]}
          open={!!selectedGuide}
          onOpenChange={(open) => !open && setSelectedGuide(null)}
        />
      )}
    </div>
  )
}
