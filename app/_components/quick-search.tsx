import { quickSearchOptions } from "../_constants/search"
import { Button } from "./ui/button"
import Image from "next/image"
import SwipeContainer from "./swipe-container"

const QuickSearch = () => {
  return (
    <div className="mt-6">
      <SwipeContainer gap={12}>
        {quickSearchOptions.map((option) => (
          <Button
            className="flex-shrink-0 gap-2"
            variant="secondary"
            key={option.title}
          >
            <Image src={option.imageUrl} width={16} height={16} alt="Cabelo" />
            {option.title}
          </Button>
        ))}
      </SwipeContainer>
    </div>
  )
}

export default QuickSearch
