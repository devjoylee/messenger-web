import styled from 'styled-components';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateContentData } from 'utils';
import { updateContent, setReplyContent } from 'redux/actions';
import { v4 as uuidv4 } from 'uuid';
import { COLOR, INPUT_HEIGHT } from 'constants/';

interface ChatFormProps {
  setToBottom: Dispatch<SetStateAction<boolean>>;
}

interface StyleProps {
  text?: string;
}

export const ChatForm = ({ setToBottom }: ChatFormProps) => {
  const [text, setText] = useState('');
  const {
    auth: { currentUser },
    content: { content, replyObj },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newContent = {
      uuid: uuidv4().slice(-10),
      text: text,
      date: new Date().getTime(),
      userId: currentUser.userId,
    };
    const updatedContent = [...content, newContent];
    if (text) {
      dispatch(updateContent(updatedContent));
      updateContentData(newContent);
      setToBottom(true);
      setText('');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setTimeout(() => {
        buttonRef.current?.click();
      }, 100);
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = INPUT_HEIGHT;
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (replyObj && textAreaRef.current) {
      const replyTemplate = `${replyObj.userName}\n${replyObj.content.text}\n(회신)\n`;
      setText(replyTemplate);
      const lineBreakRegex = new RegExp('\\n', 'g');
      const lineBreakCount = replyTemplate.match(lineBreakRegex)!.length;
      textAreaRef.current.focus();
      textAreaRef.current.style.height = (lineBreakCount + 1) * 20 + 'px';
      dispatch(setReplyContent(null));
      return;
    }
  }, [replyObj, dispatch]);

  return (
    <FormConatiner onSubmit={handleSubmit} onKeyDown={e => handleKeyDown(e)}>
      <TextInput
        value={text}
        placeholder="메시지를 입력하세요"
        onChange={e => handleChange(e)}
        ref={textAreaRef}
      />
      <Button type="submit" ref={buttonRef} text={text}>
        ➣
      </Button>
    </FormConatiner>
  );
};

const FormConatiner = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.MAIN};
  width: 100%;
  height: auto;
  padding: 0 2em;
  border-radius: 15px;
`;

const TextInput = styled.textarea`
  display: inline-block;
  margin: 15px 0;
  flex: 1;
  font-size: 1.2rem;
  font: inherit;
  resize: none;
  height: ${INPUT_HEIGHT};
  line-height: 1.4 !important;
  overflow: hidden;
  &::placeholder {
    color: #bbb;
  }
`;
const Button = styled.button<StyleProps>`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 2rem;
  border-radius: 50px;
  font-size: 1rem;
  background-color: ${({ text }) => (text ? COLOR.BUTTON : '#777')};
  opacity: ${({ text }) => (text ? 1 : 0.6)};
  cursor: pointer;
`;
