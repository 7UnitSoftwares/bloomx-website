import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Bloom - Centro Pedagogico';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/jpeg';

export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            <div
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: '#0D9488',
                marginBottom: '20px',
                lineHeight: '1.2',
              }}
            >
              Bloom
            </div>
            <div
              style={{
                fontSize: '40px',
                color: '#374151',
                marginBottom: '20px',
                lineHeight: '1.4',
              }}
            >
              Centro Pedagogico
            </div>
            <div
              style={{
                fontSize: '32px',
                color: '#6B7280',
                lineHeight: '1.4',
              }}
            >
              Fiorire nel tuo spazio, col tuo tempo
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e) {
    console.error('Error generating OpenGraph image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
