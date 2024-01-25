export function onChangeDelayed({
  event,
  onChange,
  timeout,
  setTimeOutValue,
}: {
  event: string;
  onChange: (value: string) => void;
  timeout: string | number | null;
  setTimeOutValue: Function;
}) {
  if (timeout) clearTimeout(timeout);
  setTimeOutValue(
    setTimeout(function () {
      onChange(event);
    }, 1000)
  );
}
