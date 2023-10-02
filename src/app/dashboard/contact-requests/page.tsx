'use client'

import Loader from "@/components/sections/Loader";
import { ContactsList } from "@/components/tables/ContactsList";
import { fetchContactRequests } from "@/utils/contactsApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ContactRequests() {
  const [requestsData, setRequestsData] = useState([]);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['contact-requests'],
    queryFn: fetchContactRequests,
    onSuccess(data) {
      setRequestsData(data)
    },

    refetchOnMount: true
  });

  console.log(requestsData)

  if(isError) {
    return <h1>No data found!</h1>
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {isLoading ? <Loader /> : <ContactsList contactRequests={data} /> }
        </div>
      </div>
    </div>
  )
}
