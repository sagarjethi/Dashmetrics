import { NextResponse } from "next/server"
import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY
const openai = apiKey ? new OpenAI({ apiKey }) : null

export async function POST(req: Request) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: "Image generation is currently unavailable. Please check your OpenAI API key configuration." },
        { status: 503 }
      )
    }

    const { prompt } = await req.json()

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    })

    return NextResponse.json({ url: response.data[0].url })
  } catch (error) {
    console.error("Generate image error:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}

