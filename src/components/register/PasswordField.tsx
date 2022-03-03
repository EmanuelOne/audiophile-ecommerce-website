import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>(
  (props: any, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

    return (
      <FormControl>
        <FormLabel htmlFor="password">
          {props.confirm ? 'Confirm Password' : 'Password'}
        </FormLabel>
        <InputGroup>
          <InputRightElement
            style={{ transform: 'translateY(-50%)', top: '50%' }}
          >
            <IconButton
              size={'lg'}
              variant="link"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name={!props.confirm ? 'password' : 'confirmPassword'}
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            style={{ boxShadow: '0px 0px 1px black' }}
            {...props}
          />
        </InputGroup>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
