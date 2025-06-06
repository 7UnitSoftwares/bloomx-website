import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Bloom - Centro Pedagogico';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
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
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#00A59B',
              marginBottom: '20px',
            }}
          >
            Bloom Centro Pedagogico
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#666666',
              textAlign: 'center',
              maxWidth: '800px',
              marginBottom: '40px',
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
}
