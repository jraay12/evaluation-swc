import React from 'react'

const Options2 = ({labelone, labeltwo, labelthree, labelfour}) => {
  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-16 items-start justify-center mt-10">
      <div className="flex items-center gap-4 text-sm font-bold ">
        <div className="h-10 aspect-square text-white bg-primary rounded-full text-center font-bold text-2xl">
          1
        </div>
        <p>{labelone}</p>
      </div>
      <div className="flex items-center gap-4 text-sm font-bold ">
        <div className="h-10 aspect-square text-white bg-primary rounded-full text-center font-bold text-2xl">
          2
        </div>
        <p>{labeltwo}</p>
      </div>
      <div className="flex items-center gap-4 text-sm font-bold sm:-translate-x-0">
        <div className="h-10 aspect-square text-white bg-primary rounded-full text-center font-bold text-2xl">
          3
        </div>
        <p>{labelthree}</p>
      </div>
      <div className="flex items-center gap-4 text-sm font-bold ">
        <div className="h-10 aspect-square text-white bg-primary rounded-full text-center font-bold text-2xl">
          4
        </div>
        <p>{labelfour}</p>
      </div>
     
    </section>
  )
}

export default Options2