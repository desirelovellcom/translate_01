"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RotateCcw } from "lucide-react"

export default function Component() {
  const [inputText, setInputText] = useState("")
  const [binaryOutput, setBinaryOutput] = useState("")

  const textToBinary = (text: string): string => {
    let binaryString = ""
    for (const char of text) {
      // Get the ASCII value of the character
      const asciiVal = char.charCodeAt(0)
      // Convert the ASCII value to an 8-bit binary string, padded with leading zeros
      const binaryChar = asciiVal.toString(2).padStart(8, "0")
      binaryString += binaryChar + " " // Add a space for readability between characters
    }
    return binaryString.trim() // Remove trailing space
  }

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setBinaryOutput("")
      return
    }
    const binary = textToBinary(inputText)
    setBinaryOutput(binary)
  }

  const handleCopy = async () => {
    if (binaryOutput) {
      await navigator.clipboard.writeText(binaryOutput)
    }
  }

  const handleClear = () => {
    setInputText("")
    setBinaryOutput("")
  }

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4">
            English to Binary
          </h1>
          <p className="text-lg text-gray-300">Convert your text into binary code representation</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-pink-300 flex items-center gap-2">English Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your English text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] bg-gray-800/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleTranslate}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Translate to Binary
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="icon"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                Binary Code
                {binaryOutput && (
                  <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-gray-400 hover:text-gray-200"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[200px] p-4 bg-gray-800/50 border border-gray-600 rounded-md">
                {binaryOutput ? (
                  <div className="font-mono text-sm text-green-300 leading-relaxed break-all">{binaryOutput}</div>
                ) : (
                  <div className="text-gray-500 italic">Binary output will appear here...</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6 bg-gray-900/30 border-gray-700 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center text-gray-400 text-sm">
              <p className="mb-2">
                <span className="text-purple-300 font-semibold">How it works:</span> Each character is converted to its
                ASCII value, then to an 8-bit binary string.
              </p>
              <p>Spaces and special characters are also converted. Each binary group represents one character.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
