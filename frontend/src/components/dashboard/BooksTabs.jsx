"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BooksList from "./BooksList.jsx";

export default function BooksTabs({ status, setStatus }) {

    return (
        <Tabs value={status} onValueChange={setStatus}>

            <TabsList className="grid grid-cols-3 w-full">

                <TabsTrigger value="want_to_read">
                    Want To Read
                </TabsTrigger>

                <TabsTrigger value="reading">
                    Reading
                </TabsTrigger>

                <TabsTrigger value="completed">
                    Completed
                </TabsTrigger>

            </TabsList>

            <TabsContent value="want_to_read">
                <BooksList status="want_to_read" />
            </TabsContent>

            <TabsContent value="reading">
                <BooksList status="reading" />
            </TabsContent>

            <TabsContent value="completed">
                <BooksList status="completed" />
            </TabsContent>

        </Tabs>
    );
}