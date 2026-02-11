'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Ruler, Info, Target, AlertCircle } from 'lucide-react';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label` font-weight: 600; font-size: 0.9rem; color: ${({ theme }) => theme.colors.text}; `;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  span {
    position: absolute;
    right: 12px;
    font-size: 0.8rem;
    color: #9CA3AF;
    font-weight: 600;
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  padding-right: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  transition: all 0.2s;
  &:focus { outline: none; border-color: #8B5CF6; box-shadow: 0 0 0 4px #8B5CF620; }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: white;
  width: 100%;
  font-size: 1rem;
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  border: 2px solid #ddd6fe;
  padding: 32px;
  border-radius: 20px;
  margin-top: 32px;
  text-align: center;
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const Percentage = styled.div`
  font-size: 5rem;
  font-weight: 900;
  color: #6D28D9;
  line-height: 1;
  margin: 16px 0;
  text-shadow: 0 4px 12px rgba(109, 40, 217, 0.1);
`;

const GuideBox = styled.div`
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
  border: 1px solid #e5e7eb;
`;

export default function BodyFatCalculator() {
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [waist, setWaist] = useState('');
    const [neck, setNeck] = useState('');
    const [hip, setHip] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculateBF = () => {
        const h = parseFloat(height.replace(',', '.'));
        const w = parseFloat(waist.replace(',', '.'));
        const n = parseFloat(neck.replace(',', '.'));
        const hi = parseFloat(hip.replace(',', '.'));

        if (!h || !w || !n || (gender === 'female' && !hi)) {
            alert('Por favor, preencha todos os campos necessários.');
            return;
        }

        let bf = 0;
        if (gender === 'male') {
            bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
        } else {
            bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.221 * Math.log10(h)) - 450;
        }

        setResult(Math.max(0, parseFloat(bf.toFixed(1))));
    };

    return (
        <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6D28D9', fontWeight: 700, marginBottom: '24px' }}>
                <Ruler size={24} /> Método da Marinha dos EUA
            </div>

            <Form>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <FormGroup>
                        <Label>Sexo</Label>
                        <Select value={gender} onChange={(e) => { setGender(e.target.value); setResult(null); }}>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Altura</Label>
                        <InputGroup>
                            <Input type="text" inputMode="decimal" placeholder="Ex: 175" value={height} onChange={(e) => setHeight(e.target.value)} />
                            <span>cm</span>
                        </InputGroup>
                    </FormGroup>
                </div>

                <FormGroup>
                    <Label>Cintura (na altura do umbigo)</Label>
                    <InputGroup>
                        <Input type="text" inputMode="decimal" placeholder="Ex: 85" value={waist} onChange={(e) => setWaist(e.target.value)} />
                        <span>cm</span>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <Label>Pescoço (logo abaixo do pomo de adão)</Label>
                    <InputGroup>
                        <Input type="text" inputMode="decimal" placeholder="Ex: 38" value={neck} onChange={(e) => setNeck(e.target.value)} />
                        <span>cm</span>
                    </InputGroup>
                </FormGroup>

                {gender === 'female' && (
                    <FormGroup>
                        <Label>Quadril (na parte mais larga)</Label>
                        <InputGroup>
                            <Input type="text" inputMode="decimal" placeholder="Ex: 100" value={hip} onChange={(e) => setHip(e.target.value)} />
                            <span>cm</span>
                        </InputGroup>
                    </FormGroup>
                )}

                <Button onClick={calculateBF} $fullWidth size="lg" style={{ backgroundColor: '#8B5CF6', marginTop: '12px' }}>
                    Calcular Percentual de Gordura
                </Button>
            </Form>

            {result !== null && (
                <>
                    <ResultCard>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                            <div style={{ backgroundColor: '#EDE9FE', padding: '8px 16px', borderRadius: '20px', color: '#6D28D9', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Target size={14} /> RESULTADO ESTIMADO
                            </div>
                        </div>
                        <Percentage>{result}%</Percentage>
                        <p style={{ fontWeight: 600, color: '#4C1D95', fontSize: '1.1rem' }}>Gordura Corporal Total</p>

                        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'flex-start', gap: '10px', textAlign: 'left', backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #ddd6fe' }}>
                            <Info size={20} color="#8B5CF6" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.5' }}>
                                Este cálculo tem uma margem de erro de cerca de 3%. Para maior precisão, mantenha a fita métrica esticada mas sem apertar a pele.
                            </p>
                        </div>
                    </ResultCard>

                    <GuideBox>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px', color: '#374151' }}>
                            <AlertCircle size={18} color="#F59E0B" /> Dicas de medição:
                        </div>
                        <ul style={{ fontSize: '0.8rem', color: '#6B7280', paddingLeft: '20px', lineHeight: '1.6' }}>
                            <li>Meça de manhã, logo ao acordar.</li>
                            <li>Sempre utilize a mesma fita métrica.</li>
                            <li>Peça ajuda para medir o pescoço e quadril caso necessário.</li>
                        </ul>
                    </GuideBox>
                </>
            )}
        </Card>
    );
}
