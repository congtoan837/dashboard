import React, {useEffect, useRef} from 'react'
import {
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CHeader, CHeaderBrand,
    CHeaderNav,
    useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilContrast, cilMoon, cilSun,} from '@coreui/icons'

import Logo from '../../assets/img/Logo-2.png'

const AppHeader = () => {
    const headerRef = useRef()
    const {colorMode, setColorMode} = useColorModes('coreui-free-react-admin-template-theme')

    useEffect(() => {
        document.addEventListener('scroll', () => {
            headerRef.current &&
            headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
        })
    }, [])

    return (
        <CHeader position="sticky" className="p-0" ref={headerRef}>
            <CContainer className="border-bottom p-3" fluid>
                <CHeaderNav>
                    <CHeaderBrand>
                        <img src={Logo} alt="Logo" height={40}/>
                    </CHeaderBrand>
                    <CDropdown variant="nav-item" placement="bottom-end">
                    <CDropdownToggle caret={false}>
                            {colorMode === 'dark' ? (
                                <CIcon icon={cilMoon} size="lg"/>
                            ) : colorMode === 'auto' ? (
                                <CIcon icon={cilContrast} size="lg"/>
                            ) : (
                                <CIcon icon={cilSun} size="lg"/>
                            )}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem
                                active={colorMode === 'light'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('light')}
                            >
                                <CIcon className="me-2" icon={cilSun} size="lg"/> Sáng
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'dark'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('dark')}
                            >
                                <CIcon className="me-2" icon={cilMoon} size="lg"/> Tối
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'auto'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('auto')}
                            >
                                <CIcon className="me-2" icon={cilContrast} size="lg"/> Hệ thống
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CHeaderNav>
            </CContainer>
        </CHeader>

    )
}

export default AppHeader
