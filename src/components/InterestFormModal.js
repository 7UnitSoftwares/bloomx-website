'use client';

import { sendEnquiry } from '@/utils/api';
import React, { useState } from 'react';
import Spinner from './Spinner';

const InterestFormModal = ({ isOpen, onClose, interest }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        formData.interest = interest;

        try {
            await sendEnquiry(formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', mobileNumber: '' });
            setTimeout(() => {
                onClose();
                setSubmitStatus(null);
            }, 2000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Esprimi il tuo interesse</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nome e Cognome
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 placeholder-gray-400"
                            placeholder="Inserisci il tuo nome completo"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 placeholder-gray-400"
                            placeholder="esempio@email.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Numero di Telefono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            required
                            value={formData.mobileNumber}
                            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 placeholder-gray-400"
                            placeholder="+39 XXX XXX XXXX"
                        />
                    </div>

                    {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                            Grazie! Ti contatteremo presto.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                            Si è verificato un errore. Riprova più tardi.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Spinner size="sm" className="text-white" />
                                <span>Invio in corso...</span>
                            </div>
                        ) : (
                            'Invia'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InterestFormModal; 