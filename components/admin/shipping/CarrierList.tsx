import type {
  Carrier,
  Connection,
} from "../../../lib/shipping/types";
import CarrierCard from "./CarrierCard";

type Props = {
  carriers: Carrier[];
  connectionsByCarrier: Map<string, Connection>;
  onConnect: (carrierId: string) => void;
  onManage: (connection: Connection) => void;
};

export default function CarrierList({
  carriers,
  connectionsByCarrier,
  onConnect,
  onManage,
}: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {carriers.map((carrier) => (
        <CarrierCard
          key={carrier.id}
          carrier={carrier}
          connection={connectionsByCarrier.get(carrier.id)}
          onConnect={onConnect}
          onManage={onManage}
        />
      ))}
    </div>
  );
}