import React from 'react';

interface GeneratedFormCardProps {
    title: string;
    component: JSX.Element
}

const GeneratedFormCard = ({ title, component }: GeneratedFormCardProps) => {
    return (
        <div className='h-80 md:p-6 p-2 space-y-4'>
            <h1 className='text-xl font-bold'>{title}</h1>
            <div className='w-full lg:max-w-[600px]'>
                {component}
            </div>
        </div>
    )
}

export default GeneratedFormCard