import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const positions = [
  {
    symbol: "BTC",
    quantity: 1,
    price: 10000,
    pnl: 5.32,
    entryPrice: 10000,
  },
  {
    symbol: "ETH",
    quantity: 12,
    price: 1850,
    pnl: 5.32,
    entryPrice: 1800,
  },
];

export default function Positions() {
  return (
    <div>
      {/* Card view for screens smaller than xl */}
      <div className="space-y-4 xl:hidden">
        {positions.map((position) => (
          <Card key={position.symbol}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">{position.symbol}</CardTitle>
              <Button variant="ghost" size="sm">
                Close
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-y-2 px-2 text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-medium">{position.quantity}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">{position.price}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">PnL</span>
                <span className="font-medium">{position.pnl}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Entry Price</span>
                <span className="font-medium">{position.entryPrice}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table view for xl screens and above */}
      <div className="hidden xl:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>PnL</TableHead>
              <TableHead>Entry price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.symbol}>
                <TableCell>{position.symbol}</TableCell>
                <TableCell>{position.quantity}</TableCell>
                <TableCell>{position.price}</TableCell>
                <TableCell>{position.pnl}</TableCell>
                <TableCell>{position.entryPrice}</TableCell>
                <TableCell>
                  <Button variant="ghost">Close</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
