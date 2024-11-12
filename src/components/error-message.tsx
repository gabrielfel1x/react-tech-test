// exibe mensagem de erro customizável e um ícone de alerta
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-primary text-center mt-4 flex items-center justify-center gap-2">
      <FontAwesomeIcon icon={faExclamationCircle} className="text-primary" />
      <p>{message}</p>
    </div>
  );
}
