import React from 'react';

interface PageProps {
    params: {
        groupName: string;
    }
}

function Page({params}: PageProps) {
    const groupName = params.groupName

    return (
        <div className="ml-[80px] p-5">asd</div>
    );
}

export default Page;