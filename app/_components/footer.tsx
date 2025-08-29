import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold">BSysDev</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
