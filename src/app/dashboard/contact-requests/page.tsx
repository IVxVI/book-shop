'use client'

import Loader from "@/components/sections/Loader";
import NoProducts from "@/components/sections/NoProducts";
import { ContactsList } from "@/components/tables/ContactsList";
import { fetchContactRequests } from "@/utils/contactsApi";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export default function ContactRequests() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['contact-requests'],
    queryFn: fetchContactRequests,
  });
  
  if(!data) {
    return (
      <NoProducts 
        header="No data loaded :("
        article="Sorry, we couldn’t deliver the data you’re looking for at the time. Please, check our possible errors in console"
      />
    )
  }
  
  if(isError) {
    return <h1>No data found!</h1>
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <Suspense fallback={<Loader />}>
          <ContactsList contactRequests={data} />
        </Suspense>
      </div>
    </section>
  )
}
