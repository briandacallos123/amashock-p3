import React from 'react'

const StatsMoney = ({ title, value, description }) => {
    return (
        <div className="stat w-8">
            <div className="stat-figure text-primary -mb-2 hidden lg:block">
                <svg  className="inline-block h-8 w-8 stroke-current" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g 
                id="SVGRepo_iconCarrier">  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21606 15L6.10495 16H8.11726L8.22837 15H10.003C12.2105 15 14 13.2105 14 11.003C14 9.12963 12.6989 7.5076 10.8701 7.1012L9.14852 6.71864L9.45059 4H13V1H9.78393L9.89504 0H7.88273L7.77162 1H5.99699C3.78951 1 2 2.78951 2 4.99699C2 6.87037 3.30115 8.4924 5.12992 8.8988L6.85147 9.28136L6.54939 12H3V15H6.21606ZM8.5617 12H10.003C10.5536 12 11 11.5536 11 11.003C11 10.5357 10.6754 10.1311 10.2193 10.0298L8.81528 9.71776L8.5617 12ZM7.1847 6.28223L7.43828 4H5.99699C5.44637 4 5 4.44637 5 4.99699C5 5.46427 5.32455 5.86887 5.78071 5.97023L7.1847 6.28223Z" ></path> </g></svg>
            </div>
            <div className="stat-title">{title}</div>
            <div className="stat-value text-primary text-xl lg:text-4xl">{value}</div>
            <div className="stat-desc">{description}</div>
        </div>
    )
}



export default StatsMoney