import { NextResponse } from 'next/server';
import { TokenMetricsClient } from 'tmai-api';

const TMAI_API_KEY = 'hack-b3f7d3e9-421d-47a3-b4e0-44dca99c0f0d';
const client = new TokenMetricsClient(TMAI_API_KEY);

export async function GET() {
  try {
    const tokens = await client.topMarketCapTokens.get({ top_k: 100 });
    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Error fetching coins:', error);
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
} 