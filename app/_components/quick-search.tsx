import { quickSearchOptions } from "../_constants/search"
import { Button } from "./ui/button"
import Image from "next/image"

const QuickSearch = () => {
  return (
    <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {quickSearchOptions.map((option) => (
        <Button className="gap-2" variant="secondary" key={option.title}>
          <Image src={option.imageUrl} width={16} height={16} alt="Cabelo" />
          {option.title}
        </Button>
      ))}
    </div>
  )
}

export default QuickSearch
