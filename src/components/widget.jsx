import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Form from "./form";
import { MessageCircle } from "lucide-react";
import tailwindStyles from '../index.css?inline'

function Widget({ title = "Send us your feedback", projectId }) {
  return (
    <>
    <style>{tailwindStyles}</style>
    <div className="feedback-widget fixed bottom-4 right-4 z-50">
    <Popover className="flex flex-shrink">
      <PopoverTrigger>
        <Button className="w-12 h-full sm:w-28  rounded-full shadow-md">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline"> Feedback</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="feedback-widget w-[90vw] sm:w-[500px] max-w-sm rounded-xl shadow-lg border border-gray-200">
      <style>{tailwindStyles}</style>
        <Form title = {title} projectId={projectId}/>
      </PopoverContent>
    </Popover>
  </div>
  </>
  )
}

Widget.propTypes = {
    title: PropTypes.string,
    projectId: PropTypes.string.isRequired
  };

export default Widget