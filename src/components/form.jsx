/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import supabase from "@/utils/supabase";

function Form({ title, projectId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("projectid", projectId)
    try {
      const { data, error: supabaseError } = await supabase
        .from('feedbacks')
        .insert([
          {
            project_id: projectId,
            feedback: comment,
            stars: rating,
            email: email,
          }
        ])
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      setSubmit(true);
      setRating(0);
      setComment("");
      setEmail("");
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {submit ? (
        <div className="text-center">
          <Label className="text-[18px] sm:text-lg font-semibold">
            Thank you for submitting
          </Label>
          <p className="ml-[3px] text-gray-600 text-sm">
            We appreciate your feedback.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <Label className="text-lg sm:text-xl font-semibold">
              {title}
            </Label>
            <p className="text-gray-600 text-sm sm:text-base">
              We&apos;d love to hear your thoughts. Your feedback helps us improve.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating
            </Label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-5 sm:w-6 h-5 sm:h-6 cursor-pointer transition-transform transform hover:scale-110 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Comment
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think..."
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <div className="text-center">
            <Button 
              type="submit" 
              className="mt-2 rounded-lg w-full sm:w-auto"
              disabled={loading || !email || !comment || !rating}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default Form;