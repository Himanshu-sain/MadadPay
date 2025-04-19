// app/api/matches/route.ts
export async function GET() {
  const data = [
    {
      id: 1,
      name: "Shyam Gupta",
      distance: "350m",
      cash: 2000,
      verified: true,
      rating: 4.7,
    },
    {
      id: 2,
      name: "Rahul Meena",
      distance: "750m",
      cash: 1500,
      verified: false,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Pooja Sharma",
      distance: "1.2km",
      cash: 1000,
      verified: true,
      rating: 4.9,
    },
  ];

  return Response.json(data);
}
