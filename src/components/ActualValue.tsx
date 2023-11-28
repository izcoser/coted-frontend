const ActualValue = () => {
  return (
    <div className="flex ml-10 items-start">
      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4">
        <h2 className="text-lg font-bold mb-4">Valor Unitário Atual</h2>
        <p className="text-gray-700">R$ 816,01</p>
      </div>

      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4">
        <h2 className="text-lg font-bold mb-4">Rentabilidade anual</h2>
        <p className="text-gray-700">10,15%</p>
      </div>

      <div className="max-w-md border-2 rounded-xl bg-white shadow-lg mx-2 p-4">
        <h2 className="text-lg font-bold mb-4">Última Atualização</h2>
        <p className="text-gray-700">27/11/2023, 15:47:57</p>
      </div>
    </div>
  );
};

export default ActualValue;
