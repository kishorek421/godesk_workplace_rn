import { useEffect, useState } from "react";
import { TicketListItemModel } from "@/models/tickets";
import TicketListItemLayout from "@/components/tickets/TicketListItemLayout";
import { FlatList } from "react-native";
import api from "@/services/api";
import { GET_TICKETS_BY_STATUS_KEY } from "@/constants/api_endpoints";

const LatestTicketListLayout = () => {
  const [latestTickets, setLatestTickets] = useState<TicketListItemModel[]>([]);

  useEffect(() => {
    const loadLatestTickets = () => {
      api
        .get(GET_TICKETS_BY_STATUS_KEY, {
          params: {
            status: "",
            pageNo: 1,
            pageSize: 3,
          },
        })
        .then((response) => {
          console.log(response.data);
          setLatestTickets(response.data?.data?.content ?? []);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    loadLatestTickets();
  }, []);

  return (
    <FlatList
      data={latestTickets}
      renderItem={({ item }) => <TicketListItemLayout ticketModel={item} />}
      className="my-4"
    />
  );
};

export default LatestTicketListLayout;
