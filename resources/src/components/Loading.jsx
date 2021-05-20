import React from 'react'

export default function Loading({isLoading}) {
    return (
        <div>
           {isLoading && (
                <div 
                    class="spinner-border" 
                    style={{marginLeft:'9px', width: '24px', height:'24px'}} 
                    role="status"> 
                    <span class="sr-only">Loading...</span> 
                </div>
            )} 
        </div>
    )
}

